import express from 'express'
import xssFilters from 'xss-filters'
import validator from 'validator'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'

const config = {
    email: {
        service: 'Outlook365',
        auth: {
            user: 'webcontact@techmeleon.co.uk',
            pass: 't3chm3leon@2'
        }
    },
    other: {
        deliverEmail: 'hello@techmeleon.co.uk'
    }
}

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    const attributes = [
        'name',
        'company',
        'email',
        'telephone',
        'service',
        'budget',
        'message',
        'date'
    ]

    // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
    const sanitizedAttributes = attributes.map(n =>
        validateAndSanitize(n, req.body.data[n])
    )

    // True if some of the attributes new values are false -> validation failed
    const someInvalid = sanitizedAttributes.some(r => {
        if (r !== '') {
            return !r
        } else {
            return false
        }
    })

    if (someInvalid) {
        // Throw a 422 with a neat error message if validation failed
        return res
            .status(422)
            .json({ error: 'Ugh.. That looks unprocessable!' })
    }

    // send mail
    const result = sendMail(...sanitizedAttributes)

    if (result) {
        res.status(200).json({ message: 'Success' })
    } else {
        res.status(422).json({ message: 'Failed!' })
    }
})

const rejectFunctions = new Map([
    ['name', v => v.length < 4],
    ['company', v => false],
    ['email', v => !validator.isEmail(v)],
    ['telephone', v => false],
    ['service', v => false],
    ['budget', v => false],
    ['message', v => false],
    ['date', v => false]
])
const validateAndSanitize = (key, value) => {
    // If map has key and function returns false, return sanitized input. Else, return false
    return (
        rejectFunctions.has(key) &&
        !rejectFunctions.get(key)(value) &&
        xssFilters.inHTMLData(value)
    )
}

const sendMail = (
    name,
    company,
    email,
    telephone,
    service,
    budget,
    message,
    date
) => {
    const transporter = nodemailer.createTransport(config.email)

    const subject =
        (company === '' ? `${name}` : `${name} @ ${company}`) +
        ' wishes to make contact!'

    const text = `Dear Techmeleon,\r\n
    email: ${email}\r\n
    ${telephone === '' ? '' : 'Tel: ' + telephone}\r\n
    ${service === '' ? '' : 'Solution: ' + service}\r\n
    ${budget === '' ? '' : 'Budget: ' + budget}\r\n
    ${message === '' ? '' : 'Message: ' + message}\r\n
    ${date === '' ? '' : 'Appointment: ' + date}\r\n`

    const html =
        'Dear Techmeleon,<br><br>' +
        '<b>' +
        (company === '' ? `${name}` : `${name} @ ${company}`) +
        ' wishes to make contact!</b><br><br>' +
        `<b>Email: </b><a href="emailto:${email}">${email}</a><br>` +
        (telephone === ''
            ? ''
            : `<b>Tel: </b><a href="tel:${telephone}">${telephone}</a><br>`) +
        (service === '' ? '' : `<b>Solution: </b>${service}<br>`) +
        (budget === '' ? '' : `<b>Budget: </b>${budget}<br>`) +
        (date === '' ? '' : `<b>Appointment: </b>${date}<br>`) +
        (message === '' ? '' : `<b>Message: </b>${message}<br>`)

    const emailDetails = {
        from: config.email.auth.user,
        to: config.other.deliverEmail,
        subject: subject,
        text: text,
        html: html
    }

    return transporter
        .sendMail(emailDetails)
        .then(response => {
            return true
        })
        .catch(e => {
            return false
        })
}

export default {
    path: '/api/contact',
    handler: app
}

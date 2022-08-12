import express from 'express'

const handler = (router: express.Router) => {
    router.get('/sessions', async (req, res) => {
        res.json({
            status: 200,
            message: 'Success.',
        })
    })
}

export default handler

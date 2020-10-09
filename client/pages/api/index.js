import nc from 'next-connect';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_HOST } = publicRuntimeConfig;

const handler = nc();

handler.post(async (req, res) => {
    console.log("api call");

    const course = req.body.course;

    await fetch(`${API_HOST}/course`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course),
    }).then(r => {
        if(r.status === 201){
            res.json({ message: "ok" });
        }else{
            res.status(r.status).json({status: r.status, message: r.statusText})
        }
    });
});

export default handler;
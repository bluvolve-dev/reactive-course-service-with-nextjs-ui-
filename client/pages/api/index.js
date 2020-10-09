import nc from 'next-connect';
import axios from 'axios';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_HOST } = publicRuntimeConfig;

const handler = nc();

handler.post(async (req, res) => {
    console.log("api call");

    let course = req.body.course;

    await axios.post(`${API_HOST}/course`, course).then(r => {
        if(r.status === 201){
            res.json({ message: "ok" });
        }else{
            res.status(r.status).json({status: r.status, message: r.statusText})
        }
    });
});

export default handler;
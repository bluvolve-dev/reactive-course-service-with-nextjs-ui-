import nc from 'next-connect';

const handler = nc();

handler.post(async (req, res) => {
    console.log("api call");

    let course = req.body.course;

    await fetch('http://localhost:4500/course', {
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
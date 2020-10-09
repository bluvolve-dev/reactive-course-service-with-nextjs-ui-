import React, {useState} from 'react';
import Link from "next/link";
import { v4 as uuid } from 'uuid';

const NewCourse = ({ categories, userId }) => {

    const emptyCourse = {
        title: null,
        description: null,
        categoryId: categories[0].id,
        createdByUserId: userId,
        duration: 60
    };

    const [ course, setCourse ] = useState(emptyCourse);
    const [ saved, setSaved ] = useState(false);
    const [ error, setError ] = useState(null);

    const handleSubmit =async  (e) => {
        e.preventDefault();
        await fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course: course,
            }),
        }).then(res => {
            if(res.status === 200){
                setSaved(true);
            }else{
                setError('Error: ' + res.status + ' :: ' + res.statusText);
            }
        });
    }

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const categoryOptions = categories.map(c => {
        return <option key={c.id} value={c.id}>{c.title}</option>
    });

    return <div>
        <h1>Create New Course</h1>
        <Link href="/">
            <button>
                <a>All Courses</a>
            </button>
        </Link>
        { error && <h3>{error}</h3>}
        { saved && <h3>Congrats! The course '{course.title}' was saved successfully.</h3>}
        { !saved && <form onSubmit={handleSubmit}>
            <label htmlFor="title">Course Title</label>
            <input type="text" id="title" name="title" placeholder="Course Title"
                   value={course.title || ''} onChange={handleChange}/>

            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" name="duration" placeholder="Course Duration in Minutes"
                   value={course.duration || ''} onChange={handleChange}/>

            <label htmlFor="category">Course Category</label>
            <select id="category" name="categoryId" value={course.categoryId || ''} onChange={handleChange}>
                {categoryOptions}
            </select>

            <label htmlFor="description">Description</label>
            <textarea rows="10"  id="description" name="description" placeholder="Description"
                   value={course.description || ''} onChange={handleChange}/>

            <input type="submit" value="Submit"/>
        </form>}

    </div>
}

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:4500/course/category');
    const json = await res.json();
    return { props: {
            categories: json,
            userId: uuid() // Fake user id
        }
    }
}

export default NewCourse;
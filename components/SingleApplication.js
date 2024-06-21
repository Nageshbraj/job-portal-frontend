import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleApplication() {
    const { id, appId } = useParams();
    const [job, setJob] = useState(null);
    const [status, setStatus] = useState('');
    const [update,setUpdate] = useState(null)
    const statusTypes = [
        { name: 'submitted', value: 'submitted' },
        { name: 'Under-review', value: 'Under-review' },
        { name: 'Rejected', value: 'Rejected' },
        { name: 'Accepted', value: 'Accepted' },
    ];

    useEffect(() => {
        async function fetchingJob() {
            try {
                const response = await axios.get(`http://localhost:3333/api/jobs/${id}/applications/${appId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
              
                setJob(response.data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        }
        fetchingJob();
    }, [id, appId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3333/api/jobs/${id}/applications/${appId}`, {
                status: status
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            // console.log(response.data);
            
            setUpdate(response.data.status);
            
           
        } catch (error) {
            console.error(error);
           
        }
    };
    

    const handleChange = (e) => {
        const { value } = e.target;
        // console.log(value);
        setStatus(value);
    };

    return (
        <div>
            <h2>Single Application</h2>
            <h2>Job Info</h2>
            <h4><strong>Job ID:</strong> {job?.job}</h4>
           

             <h4><strong>Status:</strong> { update ? update :job?.status}</h4>
         
            
            <form onSubmit={handleSubmit}>
                <select value={status} onChange={handleChange}>
                    <option value="">Select status:</option>
                    {statusTypes.map((ele, i) => (
                        <option key={i} value={ele.value}>{ele.name}</option>
                    ))}
                </select><br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
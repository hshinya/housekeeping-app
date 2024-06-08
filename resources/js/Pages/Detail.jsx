// resources/js/Pages/Detail.jsx

import React from 'react';
import { usePage } from '@inertiajs/react';

function Detail() {
    const { details } = usePage().props;

    console.log(details);
    return (
        <div>
            <h1>Detail List</h1>
            <ul>
                {details.map(detail => (
                    <li key={detail.id}>{detail.name}: {detail.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default Detail;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Detail() {
//     const [details, setDetails] = useState([]);

//     useEffect(() => {
//         fetchDetails();
//     }, []);

//     const fetchDetails = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/details');
//             setDetails(response.data);
//         } catch (error) {
//             console.error('Error fetching details:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Detail List</h1>
//             <ul>
//                 {details.map(detail => (
//                     <li key={detail.id}>{detail.name}: {detail.type}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Detail;
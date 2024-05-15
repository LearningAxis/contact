import { useEffect, useState } from 'react';
import './App.css'
import { defineOneEntry } from 'oneentry'

const { Forms, FormData } = defineOneEntry('https://youtube.oneentry.cloud', { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW91dHViZSIsInNlcmlhbE51bWJlciI6NiwiaWF0IjoxNzE0Mjc2NTUwLCJleHAiOjE3NDU4MTI1NDB9.gJIokRSIroVW_MSm7wPVhiTAp3zwmXVNFIm7QU5o3VU' });

function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    const oneEntry = async () => {
      const value = await Forms.getFormByMarker('contact_us', 'en_US');
      console.log(value)

      setData(value.attributes);

    }

    oneEntry();
  }, [])

  console.log(data)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: '',
  })

  const newFun = async () => {
    const body = {
      formIdentifier: 'contact_us',
      formData: {
        en_US: [
          {
            marker: 'name',
            value: formData.name,
          },
          {
            marker: 'email',
            value: formData.email,
          },
          {
            marker: 'comments',
            value: formData.comments,
          },
        ],
      },
    }

    const value = await FormData.postFormsData(body)

    console.log(value);
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  console.log(formData);

  return (
    <>
      <h2>Contact Us</h2>
      <form className='container'>
        {data.map((e, index) => {

          return (
            <input key={index}
              name={e.localizeInfos.title}
              placeholder={e.localizeInfos.title}
              type={e.type}
              onChange={handleChange}
            ></input>
          )
        })}
        <button onClick={newFun}>Submit</button>
      </form>

    </>
  )
}

export default App

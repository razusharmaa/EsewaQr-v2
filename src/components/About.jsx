import React from 'react'
import { List } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";



const About = () => {
  return (
    <div className='container mx-auto'>
<h2 className="text-4xl font-extrabold dark:text-white">EsewaQr-v2</h2>
<p className="my-4 text-lg text-gray-500">
Welcome to the EsewaQr-v2! This web application allows you to create stylish QR codes for eSewa. It supports manual input of names and numbers or decoding codes to create stylish QR codes.
</p>
<p className="my-3 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
Features
</p>
 <List className="list-disc">
  <List.Item icon={HiCheckCircle}>Stylish QR Codes: Create stylish QR codes that stand out.</List.Item>
  <List.Item icon={HiCheckCircle}>Manual Input: Manually input names and numbers to generate QR codes.</List.Item>
  <List.Item icon={HiCheckCircle}>Original eSewa QR Support: The application can accept original images of eSewa QR codes and generate stylish versions of them.</List.Item>
  <List.Item icon={HiCheckCircle}>Default Styles: If you're not sure where to start, you can use one of the provided default styles.</List.Item>
 </List>

 <p className="my-3 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
Future Enhancements</p>
<p className="text-gray-500 dark:text-gray-400">Edit Function: We're currently working on an edit function that will allow you to make changes to your stylish QR codes after they've been generated. Stay tuned for updates!</p>

</div>
  )
}

export default About

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Form, Button, Container } from 'react-bootstrap';
import { db, storage } from '../firebase'; // Ensure this path is correct

const ManageAboutMePage = () => {
  const [aboutMeData, setAboutMeData] = useState({
    firstName: '',
    lastName: '',
    contactLink: '',
    aboutDescription: '',
    contactImage: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const staticDocID = "singleUserAboutMe"; // A static ID for the document

  useEffect(() => {
    const fetchAboutMeData = async () => {
      const docRef = doc(db, 'aboutme', staticDocID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAboutMeData(docSnap.data());
      } else {
        console.log("Document does not exist, creating a new one with default values.");
        // You could initialize the document here if desired, or just leave it to the save function
      }
    };

    fetchAboutMeData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutMeData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Assuming single file upload
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null; // No file selected, return null
    const fileRef = ref(storage, `aboutmeImages/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(fileRef, imageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = await handleImageUpload(); // Upload image and get URL
    // Use existing image URL if no new image was uploaded
    imageUrl = imageUrl || aboutMeData.contactImage;
    const newData = { ...aboutMeData, contactImage: imageUrl };

    const docRef = doc(db, 'aboutme', staticDocID);
    await setDoc(docRef, newData, { merge: true });

    alert('About Me updated successfully!');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={aboutMeData.firstName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={aboutMeData.lastName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Link</Form.Label>
          <Form.Control type="text" name="contactLink" value={aboutMeData.contactLink} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>About Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="aboutDescription" value={aboutMeData.aboutDescription} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {aboutMeData.contactImage && (
            <img src={aboutMeData.contactImage} alt="Contact" style={{ marginTop: '10px', width: '100px', height: '100px' }} />
          )}
        </Form.Group>
        <Button variant="primary" type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default ManageAboutMePage;

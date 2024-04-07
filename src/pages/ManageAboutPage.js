// src/pages/EditListingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';

const ManageAboutPage = () => {
    <div>      
        <p>Complete Management page</p>
    </div>
 
};

export default ManageAboutPage;

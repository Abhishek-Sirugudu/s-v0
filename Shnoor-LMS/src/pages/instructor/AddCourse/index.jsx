import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../auth/firebase';
import AddCourseView from './view';

const AddCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const editCourseId = searchParams.get('edit');

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        category: '',
        customCategory: '',
        thumbnail: '',
        level: '',
        validityPeriod: '',
        validityUnit: 'Weeks',
        status: 'draft',
        modules: []
    });

    const [moduleForm, setModuleForm] = useState({
        title: '',
        type: 'video',
        url: '',
        duration: '',
        notes: '',
        pdfUrl: ''
    });

    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [videoInputType, setVideoInputType] = useState('url');
    const [pdfInputType, setPdfInputType] = useState('url');

    useEffect(() => {
        const loadCourse = async () => {
            if (location.state?.courseData) {
                const data = location.state.courseData;
                setCourseData({
                    title: data.title || '',
                    description: data.description || '',
                    category: data.category || '',
                    customCategory: '',
                    thumbnail: data.thumbnail || '',
                    level: data.level || '',
                    status: data.status || 'draft',
                    modules: data.modules || []
                });
                return;
            }

            if (editCourseId && !editCourseId.startsWith('mock')) {
                setLoading(true);
                try {
                    const docRef = doc(db, "courses", editCourseId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setCourseData({
                            ...data,
                            validityPeriod: data.validityPeriod || '',
                            validityUnit: data.validityUnit || 'Weeks'
                        });
                    }
                } catch (err) {
                    console.error("Error loading course:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadCourse();
    }, [editCourseId, location.state]);

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            if (value === 'custom') {
                setIsCustomCategory(true);
                setCourseData({ ...courseData, category: '' });
            } else {
                setIsCustomCategory(false);
                setCourseData({ ...courseData, category: value });
            }
        } else {
            setCourseData({ ...courseData, [name]: value });
        }
    };

    const handleModuleChange = (e) => {
        const { name, value } = e.target;
        setModuleForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (file, fieldName) => {
        if (!file) return;

        if (file.size > 100 * 1024 * 1024) {
            // File too large
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const storageRef = ref(storage, `course_content/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (error) => {
                // Upload failed
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setModuleForm(prev => ({ ...prev, [fieldName]: downloadURL }));
                setUploading(false);
                setUploadProgress(0);
                if (fieldName === 'url' && !moduleForm.title) {
                    setModuleForm(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
                }
            }
        );
    };

    const addModule = (e) => {
        e.preventDefault();
        if (!moduleForm.title || !moduleForm.url) return;

        const newModule = {
            id: Date.now().toString(),
            ...moduleForm,
            duration: moduleForm.type === 'pdf' ? 0 : (moduleForm.duration || 0)
        };
        setCourseData(prev => ({
            ...prev,
            modules: [...prev.modules, newModule]
        }));
        setModuleForm({ title: '', type: 'video', url: '', duration: '', notes: '', pdfUrl: '' });
    };

    const removeModule = (id) => {
        setCourseData(prev => ({
            ...prev,
            modules: prev.modules.filter(m => m.id !== id)
        }));
    };

    const moveModule = (index, direction) => {
        const newModules = [...courseData.modules];
        const targetIndex = index + direction;
        if (targetIndex >= 0 && targetIndex < newModules.length) {
            const [movedModule] = newModules.splice(index, 1);
            newModules.splice(targetIndex, 0, movedModule);
            setCourseData(prev => ({ ...prev, modules: newModules }));
        }
    };

    const handleSubmit = async (statusOverride) => {
        if (!auth.currentUser) return;
        setLoading(true);

        const finalCategory = isCustomCategory ? courseData.customCategory : courseData.category;

        const payload = {
            title: courseData.title,
            description: courseData.description,
            category: finalCategory,
            thumbnail: courseData.thumbnail,
            level: courseData.level,
            validityPeriod: courseData.validityPeriod,
            validityUnit: courseData.validityUnit,
            status: statusOverride,
            modules: courseData.modules,
            instructorId: auth.currentUser.uid,
            instructorName: auth.currentUser.displayName || auth.currentUser.email,
            updatedAt: new Date().toISOString()
        };

        if (!editCourseId) {
            payload.createdAt = new Date().toISOString();
        }

        try {
            if (editCourseId && !editCourseId.startsWith('mock')) {
                await updateDoc(doc(db, "courses", editCourseId), payload);
            } else {
                await addDoc(collection(db, "courses"), payload);
            }

            navigate('/instructor/courses');
        } catch (error) {
            // Error saving course
        } finally {
            setLoading(false);
        }
    };

    return (
        <AddCourseView
            step={step}
            setStep={setStep}
            loading={loading}
            courseData={courseData}
            handleCourseChange={handleCourseChange}
            moduleForm={moduleForm}
            handleModuleChange={handleModuleChange}
            isCustomCategory={isCustomCategory}
            videoInputType={videoInputType}
            setVideoInputType={setVideoInputType}
            pdfInputType={pdfInputType}
            setPdfInputType={setPdfInputType}
            handleFileUpload={handleFileUpload}
            uploading={uploading}
            uploadProgress={uploadProgress}
            addModule={addModule}
            removeModule={removeModule}
            moveModule={moveModule}
            handleSubmit={handleSubmit}
            editCourseId={editCourseId}
        />
    );
};

export default AddCourse;

// Mock student data utility for development
// TODO: [Backend] Replace this entire file with API calls to the backend

export const getStudentData = () => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('mockStudentData');
    if (stored) return JSON.parse(stored);

    return {
        currentUser: {
            name: "Test Student",
            email: "student@shnoor.com",
            role: "student"
        },
        certificates: [],
        exams: [],
        practiceChallenges: [],
        enrolledCourses: []
    };
};

export const saveStudentData = (data) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('mockStudentData', JSON.stringify(data));
};

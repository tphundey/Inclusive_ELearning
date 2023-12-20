import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function NotesComponent() {
    const [isExporting, setIsExporting] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [notes, setNotes] = useState<any[]>([]);
    const [editingNote, setEditingNote] = useState<any>(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');
    const [originalNoteContent, setOriginalNoteContent] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const { id } = useParams<any>();
    const [courseInfo, setCourseInfo] = useState<any>(null);

    const parsedVideoID = parseInt(id, 10);
    const [courseTitle, setCourseTitle] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

   useEffect(() => {
    const userId = user?.uid;

    if (userId) {
        axios.get(`http://localhost:3000/Notes?videoID=${id}&uid=${userId}`)
            .then((response) => {
                const notesData = response.data;
                
                // Lọc dữ liệu bằng logic if-else
                const filteredNotesData = notesData.filter((note) => {
                    // Thực hiện điều kiện lọc của bạn ở đây
                    return note.videoID === id && note.uid === userId;
                });
                
                const reversedNotesData = filteredNotesData.reverse();
                setNotes(reversedNotesData);

                axios.get(`http://localhost:3000/Courses/${id}`)
                    .then((courseResponse) => {
                        setCourseInfo(courseResponse.data);
                        setCourseTitle(courseResponse.data.courseName);
                    })
                    .catch((courseError) => {
                        console.error('Error loading course information:', courseError);
                    });
            })
            .catch((error) => {
                console.error('Error loading notes:', error);
            });
    }
}, [id, user]);

    const handleDeleteNote = (noteId: any) => {
        axios.delete(`http://localhost:3000/Notes/${noteId}`)
            .then((response) => {
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
            });
    };

    const handleEditNote = (noteId: any, noteContent: any) => {
        setOriginalNoteContent(noteContent);
        setEditingNoteContent(noteContent);
        setEditingNote(noteId);
    };

    const handleNewNoteEnter = async (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const userId = user?.uid;

            if (userId) {
                const vietnamTime = moment.tz('Asia/Ho_Chi_Minh');
                const formattedDate = vietnamTime.format('YYYY-MM-DD');

                axios.post('http://localhost:3000/Notes', {
                    videoID: id,
                    note: newNoteContent,
                    date: formattedDate,
                    uid: userId,
                })
                    .then((response) => {
                        setNotes([response.data, ...notes]);
                        setNewNoteContent('');
                    })
                    .catch((error) => {
                        console.error('Error creating a new note:', error);
                    });
            }
        }
    };

    const handleSaveEdit = (noteId: any) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        const userId = user?.uid;
        const vietnamTime = moment.tz('Asia/Ho_Chi_Minh');
        const formattedDate = vietnamTime.format('YYYY-MM-DD');

        axios.put(`http://localhost:3000/Notes/${noteId}`, {
            videoID: noteToEdit.videoID,
            note: editingNoteContent,
            date: formattedDate,
            uid: userId,
        })
            .then((response) => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteId ? { ...note, note: editingNoteContent, date: formattedDate } : note
                    )
                );
                setEditingNote(null);
            })
            .catch((error) => {
                console.error('Error editing note:', error);
            });
    };

    const handleExportNotes = () => {
        setIsExporting(true);

        const exportedNotes = notes.map((note) => `${note.date}\n${note.note}\n\n`).join('');

        const blob = new Blob([exportedNotes], { type: 'text/plain;charset=utf-8' });

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${courseTitle}_notes.txt`;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        setIsExporting(false);
    };

    return (
        <div className="note-page-content">
            <div className="notepage-left">
                <div>
                    <textarea
                        placeholder="Viết vào đây những gì bạn cần lưu lại"
                        name=""
                        id=""
                        aria-colspan={30}
                        aria-rowindex={10}
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        onKeyPress={handleNewNoteEnter}
                    />
                </div>
                <div className="note-fl-info">
                    <p>Ghi chú đã được lưu: {notes.length}</p>
                    <p>Vui lòng nhấn enter để lưu lại</p>
                </div>
                {notes.map((note) => (
                    <div className="note-user-content" key={note.id}>
                        <h2><i className="fa-solid fa-bookmark mr-2"></i>{note.date}</h2>
                        {editingNote === note.id ? (
                            <div>
                                <textarea
                                    value={editingNoteContent}
                                    onChange={(e) => setEditingNoteContent(e.target.value)}
                                />
                            </div>
                        ) : (
                            <p className="note-user-content-main">{note.note}</p>
                        )}
                        <div className="btfornote">
                            {editingNote === note.id ? (
                                <button onClick={() => handleSaveEdit(note.id)}>Save</button>
                            ) : (
                                <input className="note-edit" type="button" value="Edit" onClick={() => handleEditNote(note.id, note.note)} />
                            )}
                            <p>|</p>
                            <input className="note-delete" type="button" value="Delete" onClick={() => handleDeleteNote(note.id)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="notepage-right">
                <h2>Xuất ghi chú của bạn</h2>
                <p>Nhận ghi chú của bạn cho khóa học này bao gồm mô tả, tên khóa học và dấu thời gian</p>
                <button onClick={handleExportNotes} disabled={isExporting}>
                    {isExporting ? 'Đang xuất...' : 'Tải xuống'}
                </button>
            </div>
        </div>
    );
}

export default NotesComponent;

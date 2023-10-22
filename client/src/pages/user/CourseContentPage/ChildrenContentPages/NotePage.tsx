import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone';

function NotesComponent() {
    const [notes, setNotes] = useState<any[]>([]);
    const [editingNote, setEditingNote] = useState(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');
    const [originalNoteContent, setOriginalNoteContent] = useState(''); // Thêm trạng thái để lưu nội dung cũ
    const [newNoteContent, setNewNoteContent] = useState(''); // Thêm trạng thái để lưu nội dung ghi chú mới
    const { id } = useParams();
    const parsedVideoID = parseInt(id, 10);
    const [newNoteDate, setNewNoteDate] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/Notes?videoID=${id}`)
            .then((response) => {
                const notesData = response.data;
                // Sắp xếp danh sách ghi chú theo trường date giảm dần (mới nhất đầu tiên)
                notesData.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNotes(notesData);
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu ghi chú:', error);
            });
    }, [id]);
    // Hàm xóa ghi chú
    const handleDeleteNote = (noteId) => {
        // Gửi yêu cầu xóa ghi chú đến API
        axios.delete(`http://localhost:3000/Notes/${noteId}`)
            .then((response) => {
                // Sau khi xóa thành công, cập nhật trạng thái để loại bỏ ghi chú khỏi danh sách hiển thị
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            })
            .catch((error) => {
                console.error('Lỗi khi xóa ghi chú:', error);
            });
    };
    // Hàm xử lý khi nhấn nút chỉnh sửa
    const handleEditNote = (noteId, noteContent) => {
        // Đặt nội dung cũ vào trường nhập liệu và cập nhật trạng thái chỉnh sửa
        setOriginalNoteContent(noteContent); // Đặt nội dung cũ vào trạng thái
        setEditingNoteContent(noteContent); // Đặt nội dung cũ vào trường nhập liệu
        setEditingNote(noteId);
    };
    // Hàm xử lý khi nhấn nút lưu chỉnh sửa
    const handleSaveEdit = (noteId) => {
        // Tìm ghi chú cần chỉnh sửa
        const noteToEdit = notes.find((note) => note.id === noteId);

        // Lấy thời gian hiện tại dựa theo múi giờ Việt Nam
        const vietnamTime = moment.tz('Asia/Ho_Chi_Minh');
        const formattedDate = vietnamTime.format('YYYY-MM-DD');

        // Gửi yêu cầu chỉnh sửa ghi chú đến API
        axios.put(`http://localhost:3000/Notes/${noteId}`, {
            videoID: noteToEdit.videoID,
            note: editingNoteContent,
            date: formattedDate // Cập nhật trường date thành thời gian hiện tại
        })
            .then((response) => {
                // Sau khi chỉnh sửa thành công, cập nhật trạng thái danh sách ghi chú với nội dung mới
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteId ? { ...note, note: editingNoteContent, date: formattedDate } : note
                    )
                );
                // Kết thúc chỉnh sửa
                setEditingNote(null);
            })
            .catch((error) => {
                console.error('Lỗi khi chỉnh sửa ghi chú:', error);
            });
    };
    // Hàm xử lý khi người dùng nhập ghi chú mới và nhấn Enter
    const handleNewNoteEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Lấy thời gian hiện tại dựa theo múi giờ Việt Nam
            const vietnamTime = moment.tz('Asia/Ho_Chi_Minh');
            const formattedDate = vietnamTime.format('YYYY-MM-DD');

            // Gửi yêu cầu POST để tạo ghi chú mới
            axios.post('http://localhost:3000/Notes', {
                videoID: parsedVideoID,
                note: newNoteContent,
                date: formattedDate
            })
                .then((response) => {
                    // Thêm ghi chú mới vào đầu danh sách
                    setNotes([response.data, ...notes]);
                    // Xóa nội dung trường nhập liệu
                    setNewNoteContent('');
                })
                .catch((error) => {
                    console.error('Lỗi khi tạo ghi chú mới:', error);
                });
        }
    };
    return (
        <div className="note-page-content">
            <div className="notepage-left">
                <div>
                    <textarea
                        placeholder="Type your note here to save for later..."
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
                    <p>{notes.length} Notes taken</p>
                    <p>Press Enter to save</p>
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
                            <p className="note-user-content-main">{note.note}</p> // Sửa thành trường 'note'
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
                <h2>Export your note</h2>
                <p>Get your notes for this course which includes description, chapters, and timestamps</p>
                <button>Download</button>
            </div>
        </div>
    );
}

export default NotesComponent;

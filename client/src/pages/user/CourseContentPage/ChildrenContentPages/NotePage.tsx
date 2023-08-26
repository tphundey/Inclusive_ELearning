const NotePage = () => {

    return (
        <div className="note-page-content">
            <div className="notepage-left">
                <textarea placeholder="Type your note here to save for later..." name="" id="" aria-colspan={30} aria-rowindex={10} ></textarea>
                <div className="note-fl-info">
                    <p>1 Note taken</p>
                    <p>Press Enter to save</p>
                </div>
                <div className="note-user-content">
                    <h2><i className="fa-solid fa-bookmark mr-2"></i> 1. Module introdution</h2>
                    <p className="note-user-content-main">Nội dung ghi chú hiển thị ở đây !</p>
                    <div className="btfornote">
                        <input className="note-edit" type="button" value="Edit" />
                        <p>|</p>
                        <input className="note-delete" type="button" value="Delete" />
                    </div>
                </div>
            </div>
            <div className="notepage-right">
                <h2>Export your note</h2>
                <p>Get your notes for this course which includes description, chapters, and timestamps</p>
                <button>Download</button>
            </div>
        </div>
    )

};

export default NotePage;

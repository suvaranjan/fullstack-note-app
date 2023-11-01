import { useEffect, useState } from "react";
import { getNotesApiCall, deleteNoteApiCall } from "../assets/helper/api";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Note({ note, setNotes }) {
  const words = note.content.split(" ");
  const truncatedContent = words.slice(0, 20).join(" ");
  const accessToken = sessionStorage.getItem("accessToken");
  const handleDeleteNote = async (id) => {
    await deleteNoteApiCall(id, accessToken);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  return (
    <div className="grid-item grid-note">
      <p className="title">Title : {note.title}</p>
      <p>
        {truncatedContent}
        <Link
          className="readmore"
          to={`/showNote/${note._id}`}
          state={{ title: note.title, content: note.content }}
          style={{ color: "#AA00FF" }}
        >
          {" "}
          readmore...
        </Link>
      </p>
      <div className="tools">
        <Link
          to={`/editnote/${note._id}`}
          state={{ title: note.title, content: note.content }}
          style={{ color: "#AA00FF" }}
        >
          <i className="uil uil-edit"></i>
        </Link>
        <Link
          onClick={() => handleDeleteNote(note._id)}
          style={{ color: "#AA00FF" }}
        >
          <i className="uil uil-trash-alt"></i>
        </Link>
        <Link
          // to={`/shareNote/${note._id}`} // Replace with the appropriate route
          style={{ color: "#AA00FF" }}
        >
          <i className="uil uil-share"></i>
        </Link>
      </div>
    </div>
  );
}

function AllNotes() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const notesPerPage = 6;

  useEffect(() => {
    const fetchNotes = async () => {
      if (accessToken) {
        const userNotes = await getNotesApiCall(accessToken, searchQuery);
        setNotes(userNotes);
      }
    };

    fetchNotes();
  }, [accessToken, searchQuery]);

  const startIndex = currentPage * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const currentNotes = notes.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    const totalPages = Math.ceil(notes.length / notesPerPage);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {" "}
      <Toaster />
      <div
        className="container note-main-div p-3 mt-3 mb-4"
        style={{ borderRadius: "10px" }}
      >
        <div className="grid">
          <div className="grid-item grid-1">
            <h1>Your Notes</h1>
          </div>
          <div className="grid-item grid-2">
            <i className="uil uil-search"></i>
            <input
              type="text"
              placeholder="Search your notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {currentNotes
            .filter((note) =>
              note.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((note, index) => (
              <Note key={index} note={note} setNotes={setNotes} />
            ))}

          {notes.length > 7 ? (
            <div className="grid-item prev-next-btn">
              <button className="btn btn-primary" onClick={handlePrevClick}>
                Prev
              </button>
              <button className="btn btn-primary" onClick={handleNextClick}>
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AllNotes;

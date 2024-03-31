import { usePathname } from "next/navigation";
import { CgNotes } from "react-icons/cg";

const NoteLink = ({ note }: { note: Note }) => {
  let note_id = usePathname();

  note_id = note_id.substring(1);

  const handleLink = () => {
    window.history.pushState(null, "", `${note._id}`);
  };

  return (
    <p
      onClick={handleLink}
      className={`flex items-center gap-2 hover:bg-background-500 transition-all duration-200 p-1 cursor-pointer text-primary-100 mr-10 ${
        note_id == note._id && "bg-background-500"
      } `}
    >
      <CgNotes />
      <span>{note.title}</span>
    </p>
  );
};

export default NoteLink;

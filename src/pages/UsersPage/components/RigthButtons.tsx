
interface Props {
    openAddUserModal: VoidFunction;
}

const RigthButtons = ({ openAddUserModal }: Props) => {

  

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddUserModal}>
                Agregar Usuario
            </button>
        </div>
    );
};

export default RigthButtons;

import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut } from '../../services/api';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { FaUserPlus, FaEdit } from 'react-icons/fa';  // Importamos los íconos de react-icons

Modal.setAppElement('#root');

const InputField = ({ label, type = 'text', name, value, onChange, required = false, disabled = false }) => (
    <div className="mb-1">
        <label className="block mb-1 text-[#0F2A1D]">{label}:</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`border border-[#375534] p-2 rounded-md w-full bg-white text-[#0F2A1D] focus:ring-[#6B9071] focus:outline-none ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'focus:outline-none focus:ring focus:ring-blue-300 transition duration-200'}`}
        />
    </div>
);

const ModalForm = ({
    isOpen,
    onRequestClose,
    title,
    onSubmit,
    children,
    isTwoColumn = false
}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={title}
        className={"p-4 mx-auto my-20 bg-white rounded-lg shadow-lg w-2/6"}
        overlayClassName="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#375534]"
    >
        <h2 className="text-2xl font-semibold mb-0">{title}</h2>
        <form onSubmit={onSubmit} className={isTwoColumn ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''}>
            {children}
            <div className={isTwoColumn ? 'col-span-2' : ''}>
                <button type="submit" className="mb-4 mt-4 bg-[#375534] text-[#E3EED4] p-2 rounded hover:bg-[#6B9071] flex items-center transition duration-200">
                    {title}
                </button>
            </div>
        </form>
    </Modal>
);

const UsersCtrl = () => {
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [studentModalIsOpen, setStudentModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false); // Modal for editing
    const [newUser, setNewUser] = useState({ userName: '', password: '' });
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        dni: '',
        carrera: '',
        universidad: 'Universidad Peruana Union',
        habilidades: '',
        horasCompletadas: 0,
        authUserId: null
    });
    const [editedUser, setEditedUser] = useState(null); // User to edit
    const [createdUserId, setCreatedUserId] = useState(null);
    const [createdUserName, setCreatedUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage] = useState(10);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, studentsData] = await Promise.all([apiGet('/auth/users'), apiGet('/estudiante')]);
                setUsers(usersData);
                setStudents(studentsData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter users based on the search term
        if (searchTerm) {
            setFilteredUsers(users.filter(user =>
                user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        try {
            const createdUser = await apiPost('/auth/create', newUser);
            setCreatedUserId(createdUser.id);
            setCreatedUserName(createdUser.userName);
            setModalIsOpen(false);
            setStudentModalIsOpen(true);
            setNewUser({ userName: '', password: '' });
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    const handleSubmitStudent = async (e) => {
        e.preventDefault();
        try {
            await apiPost('/estudiante', { ...newStudent, authUserId: createdUserId });
            setStudentModalIsOpen(false);
            setNewStudent({
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                dni: '',
                carrera: '',
                universidad: 'Universidad Peruana Union',
                habilidades: '',
                horasCompletadas: 0,
                authUserId: null
            });
            await Promise.all([fetchUsers(), fetchStudents()]);
        } catch (error) {
            console.error('Error creating student:', error.message);
        }
    };

    const handleEditUser = (user) => {
        setEditedUser(user); // Set user data to edit
        setEditModalIsOpen(true); // Open the edit modal
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!editedUser) return;
        try {
            const updatedUser = await apiPut(`/auth/users`, editedUser); // PUT request to update user
            setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setEditModalIsOpen(false); // Close edit modal
            setEditedUser(null); // Reset edited user state
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    const handlePageClick = ({ selected }) => setCurrentPage(selected);
    const displayedUsers = filteredUsers.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    return (
        <div className="p-6 bg-[#E3EED4] min-h-screen">
            <h2 className="text-3xl font-semibold mb-6 text-[#0F2A1D]">Control de Usuarios</h2>

            {/* Search bar */}
            <div className="mb-4"><strong>Busqueda: </strong>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre de usuario o rol"
                    className="p-2 w-full border border-[#375534] rounded-md focus:outline-none focus:ring focus:ring-[#6B9071] transition duration-200"
                />
            </div>

            <button
                onClick={() => setModalIsOpen(true)}
                className="mb-4 bg-[#375534] text-[#E3EED4] p-2 rounded hover:bg-[#6B9071] flex items-center transition duration-200"
            >
                <FaUserPlus className="mr-2" />
                <span>Crear Usuario</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedUsers.map(user => (
                    <div key={user.id} className="bg-[#AEC3B0] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                        <h3 className="text-xl font-semibold text-[#375534]">{user.userName}</h3>
                        <p className="text-[#375534]"><strong>ID:</strong> {user.id}</p>
                        <p className="text-[#375534]"><strong>ROL:</strong> {user.role}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleEditUser(user)}
                                className="flex items-center justify-center p-3 rounded-md hover:bg-[#6B9071] transition duration-300 shadow-md text-[#0F2A1D] bg-white"
                            >
                                <FaEdit className="mr-2" /> {/* Ícono de editar */}
                                <span>Editar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ReactPaginate
                pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center mt-6 space-x-4"
                activeClassName="bg-[#375534] text-white px-4 py-2 rounded"
                disabledClassName="text-gray-400"
            />

            {/* Modal for creating user */}
            <ModalForm
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title="Crear Usuario"
                onSubmit={handleSubmitUser}
            >
                <InputField
                    label="Nombre de usuario"
                    name="userName"
                    value={newUser.userName}
                    onChange={(e) => handleInputChange(e, setNewUser)}
                    required
                />
                <InputField
                    label="Contraseña"
                    name="password"
                    value={newUser.password}
                    onChange={(e) => handleInputChange(e, setNewUser)}
                    required
                    type="password"
                />
            </ModalForm>

            {/* Modal for creating student */}
            <ModalForm
                isOpen={studentModalIsOpen}
                onRequestClose={() => setStudentModalIsOpen(false)}
                title="Crear Estudiante"
                onSubmit={handleSubmitStudent}
            >
                <InputField
                    label="Nombre"
                    name="nombre"
                    value={newStudent.nombre}
                    onChange={(e) => handleInputChange(e, setNewStudent)}
                    required
                />
                <InputField
                    label="Apellido Paterno"
                    name="apellidoPaterno"
                    value={newStudent.apellidoPaterno}
                    onChange={(e) => handleInputChange(e, setNewStudent)}
                    required
                />
                <InputField
                    label="Apellido Materno"
                    name="apellidoMaterno"
                    value={newStudent.apellidoMaterno}
                    onChange={(e) => handleInputChange(e, setNewStudent)}
                    required
                />
                <InputField
                    label="DNI"
                    name="dni"
                    value={newStudent.dni}
                    onChange={(e) => handleInputChange(e, setNewStudent)}
                    required
                />
                <div className="mb-1">
                    <label className="block mb-1 text-[#0F2A1D]">Carrera:</label>
                    <select
                        name="carrera"
                        value={newStudent.carrera}
                        onChange={(e) => handleInputChange(e, setNewStudent)}
                        required
                        className="border border-[#375534] p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-[#6B9071] transition duration-200"
                    >
                        <option value="">Seleccione una carrera</option>
                        <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                        <option value="Ingeniería Civil">Ingeniería Civil</option>
                        <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
                    </select>
                </div>
                <InputField
                    label="Habilidades"
                    name="habilidades"
                    value={newStudent.habilidades}
                    onChange={(e) => handleInputChange(e, setNewStudent)}
                    required
                />
            </ModalForm>

            {/* Modal para editar usuario */}
            <ModalForm
                isOpen={editModalIsOpen}
                onRequestClose={() => setEditModalIsOpen(false)}
                title="Editar Usuario"
                onSubmit={handleUpdateUser}
                width="w-full max-w-lg"
                height="h-auto"
            >
                <InputField
                    disabled
                    label="Username"
                    name="userName"
                    value={editedUser?.userName || ''}
                    onChange={(e) => handleInputChange(e, setEditedUser)}
                    required
                />
                <InputField
                    disabled
                    label="Password (Encriptado)"
                    type="password"
                    name="password"
                    value={editedUser?.password || ''}
                    onChange={(e) => handleInputChange(e, setEditedUser)}
                    required
                />

                <div className="mb-1">
                    <label className="block mb-1 text-[#0F2A1D]">Rol:</label>
                    <select
                        name="role"
                        value={editedUser?.role || ''}
                        onChange={(e) => handleInputChange(e, setEditedUser)}
                        required
                        className="border border-[#375534] p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-[#6B9071] transition duration-200"
                    >
                        <option value="USER_ADMIN">USER_ADMIN</option>
                        <option value="USER_DEFAULT">USER_DEFAULT</option>
                    </select>
                </div>
            </ModalForm>
        </div>
    );
};

export default UsersCtrl;
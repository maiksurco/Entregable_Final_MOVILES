import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import UsersCtrl from './pages/admin/UsersCtrl';
import EmpresaCtrl from './pages/admin/EmpresaCtrl';
import EstudianteCtrl from './pages/admin/EstudianteCtrl';
// import NotificacionCtrl from './pages/admin/NotificacionCtrl';
import OfertaCtrl from './pages/admin/OfertaCtrl';
import PostulacionCtrl from './pages/admin/PostulacionCtrl';
import SeguimientoCtrl from './pages/admin/SeguimientoCtrl';
import DashboardUser from './pages/users/DashboardUser';
import HomeCli from './pages/HomeCli';
import OfertasUser from './pages/users/OfertasUser';
import PostulacionUser from './pages/users/PostulacionUser';
import PerfilUser from './pages/users/PerfilUser';
import OfertaCli from './pages/OfertaCli';
import LoginPage from './pages/LoginPage';
import NotificacionUser from './pages/users/NotificacionUser';

function App() {
  return (
    <Router>
      <Routes>
        {/*Rutas del Home*/}
        <Route path='/' element={<HomeCli />}>
          <Route path='oferta' element={<OfertaCli />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/*Rutas del Usuario*/}
        <Route path="/user" element={<DashboardUser />}>
          <Route path='perfil' element={<PerfilUser />} />
          <Route path='ofertas' element={<OfertasUser />} />
          <Route path='postulaciones' element={<PostulacionUser />} />
          <Route path='notificaciones' element={<NotificacionUser />} />
        </Route>

        {/*Rutas del Admin*/}
        <Route path="/admin" element={<DashboardAdmin />}>
          <Route path="users" element={<UsersCtrl />} />
          <Route path="empresa" element={<EmpresaCtrl />} />
          <Route path="estudiante" element={<EstudianteCtrl />} />
          {/*<Route path="notificacion" element={<NotificacionCtrl />} /> */}
          <Route path="postulacion" element={<PostulacionCtrl />} />
          <Route path="oferta" element={<OfertaCtrl />} />
          <Route path="postulacion" element={<PostulacionCtrl />} />
          <Route path="seguimiento" element={<SeguimientoCtrl />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
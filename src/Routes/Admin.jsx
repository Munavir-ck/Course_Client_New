import React from 'react'
import AdminHome from '../pages/Admin/AdminHome';
import AdminLogin from '../Components/Admin/AdminLogin';
import AddTeacher from '../pages/Admin/AddTeacher';
import TeachersList from '../pages/Admin/TeachersList';
import Upload from '../pages/Admin/Upload';
import Add_subjectPage from '../pages/Admin/Add_subjectPage';
import Transaction_page from '../pages/Admin/Transaction_page';
import ErrorPage from '../Components/Admin/ErrorPage/ErrorPage';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Route,Routes} from 'react-router-dom';

function Admin() {





    const isAuth = useSelector(state => state.admin.token);
    
 


 
  return (
    <div>
       <Routes>
      <Route  path='/' element={<AdminLogin/>}/>
      <Route path='/home' element={isAuth?<AdminHome/>:<Navigate to={'/admin/'} />}/>
      <Route path='/addTeachers' element={isAuth?<AddTeacher/>:<Navigate to={'/admin/'} />}/>
      <Route path='/teachers' element={isAuth?<TeachersList/>:<Navigate to={'/admin/'} />}/>
      <Route path='/uploadclass' element={isAuth?<Upload/>:<Navigate to={'/admin/'} />}/>
      <Route path='/add_subject' element={isAuth?<Add_subjectPage/>:<Navigate to={'/admin/'} />}/>
      <Route path='/transactions' element={isAuth?<Transaction_page/>:<Navigate to={'/admin/'} />}/>
      <Route path="/*"  element={<ErrorPage link={"/admin/home"} />} />
      </Routes>
    </div>
  )
}

export default Admin

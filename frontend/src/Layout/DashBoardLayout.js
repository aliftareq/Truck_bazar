import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)

    let activeStyle = {
        backgroundColor: "green",
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-base-100 lg:bg-transparent text-base-content space-y-2">
                        {/* <!-- Sidebar content here --> */}
                        {
                            isBuyer &&
                            <li>
                                <NavLink to='/dashboard/myorders'
                                    className='btn btn-warning'
                                    end
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                >My orders</NavLink>
                            </li>
                        }
                        {
                            isSeller &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/myproducts'
                                        className='btn btn-warning'
                                        end
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        My Products
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/add-products'
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        Add A product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-buyers'
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        My buyers
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li>
                                    <NavLink to='/dashboard/all-sellers' end
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        All Sellers
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/all-buyers'
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        All Buyers
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/all-admin'
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        All Admins
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reported-items'
                                        className='btn btn-warning'
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                    >
                                        Reported Items
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;
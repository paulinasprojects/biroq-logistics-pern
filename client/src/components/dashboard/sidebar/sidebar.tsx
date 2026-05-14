import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { TextLogo } from '@/components/common/text-logo';
import { House, Monitor, Building, Van, Warehouse, ChartColumnDecreasing, ChevronLeft, Landmark, Package, LogOut } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from './sidebar-context';
import { SmallLogo } from '@/components/common/small-logo';
import { useAuthStore } from '@/store/auth-store';
import { useCompanyStore } from '@/store/company-store';
import { useEffect } from 'react';

const links = [
  { title: "Dashboard", href: "/dashboard", icon: House },
  { title: "Company", href: "/company", icon: Building },
  { title: "Shipments", href: "/shipments", icon: Van },
  { title: "Pickups", href: "/pickups", icon: Package },
  { title: "Warehouses", href: "/warehouses", icon: Warehouse },
  { title: "Monitoring", href: "/monitoring", icon: Monitor },
  { title: "Analytics", href: "/analytics", icon: ChartColumnDecreasing },
]

const sidebarVariants: Variants = {
  expanded: { width: 256, transition: { type: "spring", damping: 30, stiffness: 300 } },
  collapsed: { width: 64, transition: { type: "spring", damping: 30, stiffness: 300 } }
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 }
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  },
}

const itemVariants = {
  open: { opactiy: 1, x: 0, transition: { duration: 0.18 } },
  closed: { opactiy: 0, x: -8, transition: { duration: 0.15 } }
}


const Sidebar = () => {
  const isMobile = useIsMobile();
  const { collapsed, toggleCollapse } = useSidebar();
  const cannotExpand = isMobile;
  const isCollapsed = cannotExpand ? true : collapsed;
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const { company, getCompany } = useCompanyStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCompany();
  }, [getCompany])

  function handleLogout() {
    logout();
    navigate("/")
  }

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className='flex flex-col h-screen border-r border-r-gray-200 bg-white select-none'
    >
      <div className='flex flex-col h-full pl-3 pt-5 pb-3'>
        <div className={cn(
          'flex items-center justify-between mb-4',
          isCollapsed && "justify-center")}
        >
          <div className="flex items-center gap-3">
            {isMobile && (
              <Link to="/" className="ml-2 mt-2">
                <SmallLogo className='size-6' />
              </Link>
            )}
            <AnimatePresence initial={false}>
              {
                !isCollapsed && (
                  <motion.a
                    key="title"
                    className='ml-5 mt-2'
                    href='/'
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                  >
                    <TextLogo />
                  </motion.a>
                )
              }
            </AnimatePresence>
          </div>
          {!isMobile && (
            <button
              onClick={toggleCollapse}
              className="p-2 hover:bg-gray-50 cursor-pointer"
            >
              <ChevronLeft className='size-4' />
            </button>
          )}
        </div>
        <nav className='flex-1'>
          <div className={cn(
            'flex items-center gap-2 py-5 border-t border-b border-gray-200',
            isCollapsed ? "pl-3" : "pl-5")}
          >
            <Landmark className='size-4' />
            {!isCollapsed && (
              <span className='font-bold text-sm'>{company?.name || "No company"}</span>
            )}
          </div>
          <div className={cn(
            'pl-5 pt-4 text-gray-400',
            isCollapsed ? "hidden" : "block")}
          >
            <h3 className='uppercase text-[12px] font-normal leading-[100%] tracking-[6%]'>
              Main menu
            </h3>
          </div>
          <motion.ul
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
            variants={listVariants}
            className='flex flex-col gap-2 mt-5'
          >
            {links.map((link) => (
              <motion.li key={link.href}>
                <Link to={link.href} className={cn(
                  "flex items-center text-sm px-3.5 py-3 font-medium text-gray-500 hover:bg-gray-100 transition-all",
                  pathname === link.href && "bg-gray-200 font-semibold text-black rounded-md border-r-2 border-white",
                  isCollapsed ? "justify-center px-0 rounded-full" : "gap-3 justify-start"
                )}>
                  <link.icon className='w-4 h-4' />
                  {!isCollapsed && (
                    <span className='text-sm'>{link.title}</span>
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        <div className="mt-auto">
          <div className="h-px bg-gray-200 my-3" />
          <motion.div
            variants={itemVariants}
            className={cn(
              'flex items-center justify-between gap-2 ml-2 pt-2 pr-2',
              isCollapsed && "flex-col")}
          >
            <div className='flex gap-2 items-center'>
              <img
                src="/default-user.png"
                alt="profile image"
                className="w-8 h-8 rounded-full object-cover"
              />
              {!isCollapsed && (
                <span className='text-sm font-medium text-black'>
                  {user?.firstName} {" "} {user?.lastName}
                </span>
              )
              }
            </div>
            <div>
              <button
                className='flex gap-2 items-center'
                onClick={handleLogout}
              >
                {!isCollapsed && (
                  <span className='text-sm'> Logout</span>
                )}
                <LogOut className='size-4' />
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
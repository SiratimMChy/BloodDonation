import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useDemoRestriction } from '../../Hooks/useDemoRestriction';
import { FaUser, FaUserShield } from 'react-icons/fa';

const DemoUserBadge = () => {
    const { user } = useContext(AuthContext);
    const { isDemoUser, getDemoUserType } = useDemoRestriction();
    
    if (!user?.email || !isDemoUser(user.email)) {
        return null;
    }
    
    const demoType = getDemoUserType(user.email);
    
    const badgeConfig = {
        DONOR: {
            icon: FaUser,
            text: 'Demo Donor',
            bgColor: 'bg-blue-500',
            textColor: 'text-white'
        },
        ADMIN: {
            icon: FaUserShield,
            text: 'Demo Admin',
            bgColor: 'bg-purple-500',
            textColor: 'text-white'
        }
    };
    
    const config = badgeConfig[demoType];
    const IconComponent = config.icon;
    
    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`${config.bgColor} ${config.textColor} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold animate-pulse`}>
                <IconComponent className="w-4 h-4" />
                <span>{config.text}</span>
            </div>
        </div>
    );
};

export default DemoUserBadge;
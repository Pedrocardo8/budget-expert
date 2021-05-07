import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AdjustIcon from '@material-ui/icons/Adjust';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Budget",
        icon: <AssignmentTurnedInIcon />,
        link: "/budget"
    },
    {
        title: "Goals",
        icon: <AdjustIcon />,
        link: "/goals"
    },
    {
        title: "Expenses",
        icon: <CreditCardIcon />,
        link: "/expenses"
    },
    {
        title: "Investments",
        icon: <AssessmentIcon />,
        link: "/investments"
    },



];



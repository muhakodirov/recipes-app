"use client"
import Header from '@/components/header/Header';
import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import { useUserContext } from "@/context/User"
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const { currUser } = useUserContext();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (currUser === null) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [currUser, router]);


    if (loading) return <p>Lädt...</p>;

    return (
        <div>
            <Header />
            <ProfileHeader />
            <ProfileTabs />
        </div>
    );
};

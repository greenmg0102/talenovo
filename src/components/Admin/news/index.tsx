'use client'
import { useState, useEffect } from 'react';
import { subscriptionGet } from '@/store/action/admin/subscription'
import { Button } from "antd";
import { newsAutomation } from '@/store/action/admin/mail/news'
import { jobAlertAutomation } from '@/store/action/admin/mail/jobAlert'


export default function News() {

    return (
        <div>
            <Button
                type="primary"
                onClick={() => newsAutomation()}
            >
                Send News to all Users
            </Button>

            <Button
                type="primary"
                onClick={() => jobAlertAutomation()}
            >
                Send Job Alert to all Users
            </Button>
        </div>
    )
}
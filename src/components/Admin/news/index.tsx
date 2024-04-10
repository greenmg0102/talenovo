'use client'
import { useState, useEffect } from 'react';
import { subscriptionGet } from '@/store/action/admin/subscription'
import { Button } from "antd";
import { newsAutomation } from '@/store/action/admin/news'

export default function News() {

    return (
        <div>
            <Button
                type="primary"
                onClick={() => newsAutomation()}
            >
                Send News to all Users
            </Button>
        </div>
    )
}
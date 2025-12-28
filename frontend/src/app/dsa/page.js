"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api-client"
import TopicCard from "./components/TopicCard";

export default function DsaDashboard() 
{
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        api.get("/problems/topics/summary")
        .then(res => setTopics(res.data));
    }, []);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>DSA Practice</h1>

            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {topics.map(topic => (
                <TopicCard key={topic.topic} data={topic} />
                ))}
            </div>
        </main>
    )
}
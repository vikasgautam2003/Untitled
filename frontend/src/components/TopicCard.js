import Link from "next/link";
import ProgressBar from "./ProgressBar";

export default function TopicCard({ data }) {
    const  { topic, totalProblems, completedProblems } = data;


    return (
        <div style={{ border: "1px solid #333", padding: "1rem", borderRadius: "8px" }}>
            <h3>{topic.replace("_", " ")}</h3>

            <ProgressBar
                completed={completedProblems}
                total={totalProblems}
            />

            <p>{completedProblems} / {totalProblems} completed</p>

            <Link href={`/dsa/topic/${topic}`}>
                View Problems →
            </Link>
       </div>
  );
}
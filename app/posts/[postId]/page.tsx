"use client"
import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { ClipLoader } from "react-spinners";


const PostView = () => {
    const router = useRouter();  
    const pathname = usePathname()

    const postId: string | undefined = pathname.split('/').pop() ?? ''; 

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if(isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return ( 
        <>
            <Header label="Tweet" showBackArrow  />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
     );
}
 
export default PostView;
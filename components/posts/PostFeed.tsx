"use client"
import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: allPosts = [] } = usePosts('');

    const posts = userId
    ? allPosts.filter((post: { user: { id: string; }; }) => post.user.id === userId)
    : allPosts;
    
  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
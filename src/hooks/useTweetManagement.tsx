import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '@/server/firebase';

export function useTweetManagement() {
  async function editTweet(tweetId: string, updatedData: { tweet: string }) {
    try {
      const tweetRef = doc(db, 'tweets', tweetId);
      await updateDoc(tweetRef, updatedData);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTweet(
    tweetId: string,
    userId: string,
    hasPhoto: string | undefined
  ) {
    try {
      const tweetRef = doc(db, 'tweets', tweetId);
      await deleteDoc(tweetRef);

      if (hasPhoto) {
        const photoRef = ref(storage, `tweets/${userId}/${tweetId}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { deleteTweet, editTweet };
}

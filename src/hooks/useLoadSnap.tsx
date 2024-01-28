import { useEffect, useRef, useState } from 'react';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from '@/server/firebase';

export interface ISnap {
  id: string;
  createdAt: number;
  postedAt: { month: number; day: number };
  photo?: string;
  snap: string;
  userId: string;
  username: string;
  userEmail: string;
  profilePicture: string;
}

export function useLoadSnap(order: 'all' | 'userId') {
  const user = auth.currentUser;
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const [snaps, setSnaps] = useState<ISnap[]>([]);

  async function updateProfilePicture(newPictureUrl: string) {
    const batch = writeBatch(db);

    snaps.forEach(snap => {
      const snapRef = doc(db, 'snaps', snap.id);
      batch.update(snapRef, { profilePicture: newPictureUrl });
    });

    await batch.commit();
  }

  useEffect(() => {
    async function fetchSnap() {
      const snapsQuery =
        order === 'userId'
          ? query(
              collection(db, 'snaps'),
              where('userId', '==', user?.uid),
              orderBy('createdAt', 'desc'),
              limit(50)
            )
          : query(
              collection(db, 'snaps'),
              orderBy('createdAt', 'desc'),
              limit(50)
            );

      unsubscribeRef.current = onSnapshot(snapsQuery, snapshot => {
        const snaps = snapshot.docs.map(doc => {
          const {
            createdAt,
            postedAt,
            photo,
            snap,
            userId,
            username,
            userEmail,
            profilePicture,
          } = doc.data();
          return {
            id: doc.id,
            createdAt,
            postedAt,
            photo,
            snap,
            userId,
            username,
            userEmail,
            profilePicture,
          };
        });
        setSnaps(snaps);
      });
    }

    fetchSnap();

    return () => {
      unsubscribeRef.current && unsubscribeRef.current();
    };
  }, [order, user]);

  return { user, snaps, updateProfilePicture };
}

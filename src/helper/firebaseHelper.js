// import { storage } from '../firebase';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from 'src/firebase';
export function firebaseUploadSingle(uploadImage, uploadDir, setUploadPercent, onError, doAfterGetUrl) {
  const uploadFileName = `${Date.now()}_${uploadImage.name}`;
  const storageRef = ref(storage, uploadFileName);
  const uploadTask = uploadBytesResumable(storageRef, uploadImage);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setUploadPercent(progress);
    },
    (error) => {
      onError(error);
    },
    async () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('action-firebaseUploadSingle', downloadURL);
        doAfterGetUrl(downloadURL);
      });
    }
  );
}

export function firebaseUploadMultiple(uploadMultiple, uploadDir, setUploadPercent, onError, doAfterGetUrl) {
  const promises = [];
  const urlsPictures = [];
  // eslint-disable-next-line array-callback-return
  uploadMultiple.map((image) => {
    const uploadFileName = `${Date.now()}_${image.name}`;
    const uploadTask = storage.ref(`${uploadDir}/${uploadFileName}`).put(image);
    promises.push(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref(uploadDir)
          .child(uploadFileName)
          .getDownloadURL()
          .then((urls) => {
            console.log('action-firebaseUploadMultiple', urls);
            urlsPictures.push(urls);
            doAfterGetUrl(urlsPictures);
          });
      }
    );
  });
  Promise.all(promises)
    .then(() => alert('All images uploaded'))
    .catch((err) => console.log(err));
}

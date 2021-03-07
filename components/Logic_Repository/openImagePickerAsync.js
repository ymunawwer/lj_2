import * as ImagePicker from "expo-image-picker";

const openImagePickerAsync = async (allowsEditing, allowsMultipleSelection) => {
  try {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: allowsMultipleSelection,
      base64: true
    })
  }
  catch (e) {
    new Promise.reject(e)
  }
};

export default openImagePickerAsync

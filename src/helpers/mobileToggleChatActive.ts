export default function(activateChat: boolean) {
  let messenger: any = document.getElementById('messengerContainer');
  if (activateChat) {
    messenger.classList.add('f_chat_active');
  } else {
    messenger.classList.remove('f_chat_active');
  }
}

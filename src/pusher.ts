import Pusher from "pusher";

const pusher = new Pusher({
    appId: "1761247",
    key: "919f06b6a4ef43e6857f",
    secret: "cf478e64c1b8421e61fd",
    cluster: "us2",
    useTLS: true,
  });

  export default pusher 
  
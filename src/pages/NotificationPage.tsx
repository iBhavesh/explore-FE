import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { readAllNotifications } from "../features/notifications/notificationsSlice";
import NotificationItem from "../components/Notifications/NotificationItem";
import NoNotificationFound from "../components/Notifications/NoNotificationFound";

const NotificationPage = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Explore | Notifications";
  }, []);

  useEffect(() => {
    dispatch(readAllNotifications());
  }, [dispatch]);

  if (notifications.length > 0)
    return (
      <Grid container direction="column" alignItems="center">
        {notifications.map((element) => (
          <NotificationItem key={element.id} notification={element} />
        ))}
      </Grid>
    );

  return <NoNotificationFound />;
};

export default NotificationPage;

import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import NoPersonFound from "../components/SearchResult/NoPersonFound";
import SearchResultItem from "../components/SearchResult/SearchItem";
import CircularIndeterminate from "../components/UI/CircularIndeterminate";
import { useLocation } from "react-router-dom";
import { fetchUserList } from "../features/user/userList";
import { useState } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultPage = () => {
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();
  const query = useQuery();
  const [isIntitial, setisIntitial] = useState(true);

  useEffect(() => {
    document.title = "Explore | Notifications";
  }, []);

  useEffect(() => {
    if (query.get("query")) {
      if (isIntitial) {
        dispatch(fetchUserList(query.get("query")!));
        setisIntitial(false);
      }
    }
  }, [query, dispatch, isIntitial]);

  if (status === "loading") <CircularIndeterminate />;

  if (users.length > 0)
    return (
      <Grid container direction="column" alignItems="center">
        {users.map((element) => (
          <SearchResultItem key={element.id} user={element} />
        ))}
      </Grid>
    );

  return <NoPersonFound />;
};

export default SearchResultPage;

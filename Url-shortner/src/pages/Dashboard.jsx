import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarLoader } from "react-spinners";
import { Filter } from 'lucide-react';
import { urlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { getUrls } from '@/utils/apiUrls';
import { getclicks } from '@/utils/apiClicks';
import Error from '@/components/ui/error';
import LinkCard from '@/components/LinkCard';
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = urlState()
  const { data: urls, loading, fn: fnUrls, error } = useFetch(getUrls, user.id)
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks, }
    = useFetch(
      getclicks,
      urls?.map((url) => url.id)
    );

  useEffect(() => {
    fnUrls();
  }, []);
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center gap-12">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>total clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl  font-extrabold"> My links </h1>
        <Button>Create</Button>
      </div>
      <div className='relative'>
        <Input type="text" placeholder="transform your links here" value={searchQuery} onChange={(e) => {
          searchQuery(e.target.value)
        }} />
        <Filter className='absolute top-2 right-2 p-1' />
      </div>
      {error && <Error message={error.message} />}
      {(filteredUrls || []).map((url, id) => {
        return <LinkCard id={id} url={url} fetchUrl={fnUrls} />
      })}
    </div>
  );
};
export default Dashboard;
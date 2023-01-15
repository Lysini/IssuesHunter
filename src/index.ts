import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';
import { RESOLVERS } from './types';

const jsonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const resolver = new Resolver();

const extractIssuesFromResponse = async (response) => {
    if(response.status == 200){
        const resJson = await response.json();
        
        return resJson.issues;
    } else {
        return []
    }
}

const getUserIssuesURL = (maxResults=50, startAt=0) => {
    return route`/rest/api/2/search?jql=assignee=currentuser()&maxResults=${maxResults}&startAt=${startAt}&fields=status,statuscategorychangedate
    `
}

resolver.define(RESOLVERS.GET_USER_ISSUES, async () => {
    const maxResults = 50;

    const res = await api.asUser().requestJira(getUserIssuesURL(maxResults, 0), {
        headers: { ...jsonHeaders },
    });

    const status = res.status;

    if(status == 200){
        const data = await res.json();

        if(data.issues.length < data.total){
            var issues = [...data.issues];
            const pagesAmount = Math.ceil(data.total / maxResults)
            for(var i = 1; i <= pagesAmount; i++){
                var pageRes = await api.asUser().requestJira(getUserIssuesURL(maxResults, i * maxResults), {
                    headers: { ...jsonHeaders },
                });

                issues = [...issues, ...await extractIssuesFromResponse(pageRes)]
            }

            return { status, data: issues }
        } else {
            return { status, data: data.issues };
        }
    } else {
        return { status, data: [] }
    }
});

resolver.define(RESOLVERS.GET_USER_DATA, async () => {
    const res = await api.asUser().requestJira(route`/rest/api/2/myself`, {
        headers: { ...jsonHeaders },
    });

    const status = res.status;
    const data = await res.json();

    if(status == 200){
        return {
            status,
            data
        }
    } else {
        return {
            status,
            data: {}
        }
    }
})


export const handler = resolver.getDefinitions();

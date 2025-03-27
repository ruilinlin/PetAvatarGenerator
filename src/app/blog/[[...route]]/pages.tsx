interface RoutePageProps {
    params:{
        route: string[]
    }
}

const RoutePage = ({params}: RoutePageProps) => {
    return (<div>BlogPage:{params.route.join('/')}</div>);
};

export default RoutePage;

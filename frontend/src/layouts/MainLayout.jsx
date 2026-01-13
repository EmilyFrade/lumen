import TopBar from "../components/TopBar";

function MainLayout({ children }) {
    return (
        <>
            <TopBar />
            <div className="container-fluid px-4 mt-4">
                {children}
            </div>
        </>
    );
}

export default MainLayout;

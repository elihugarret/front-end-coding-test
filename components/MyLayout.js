import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <style jsx>{`
            @import url('https://fonts.googleapis.com/css?family=Roboto');

            div {
                font-family: 'Roboto', sans-serif;
            }
        `}</style>
    </div>
)

export default Layout
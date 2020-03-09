import fetch from 'isomorphic-unfetch';

function Index(props) {
    return (
        <div>Hello from NEXT JS
            {
                 console.log(props.user)
            }
        </div>
    )
}

  Index.getInitialProps = async function() {
    const res = await fetch('http://localhost:5000/getIP');
    const data = await res.json();
  
    return {
      user: data
    };
  }

  export default Index;
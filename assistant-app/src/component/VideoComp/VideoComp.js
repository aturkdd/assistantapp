
export default function VideoComp({data}) {
  

  return (
    <div>
     <video width="600" controls>
        <source src={data} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function userprofile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl p-3 rounded bg-orange-400 text-black">
        See {params.id}{" "}
      </h1>
      <hr />
      <h1 className="text3-xl">Profile</h1>
      <hr />
      <p className="text-3xl ">Profile Page</p>
      <span className="text-3xl p-3 rounded bg-orange-400 text-black">
        {params.id}
      </span>
    </div>
  );
}

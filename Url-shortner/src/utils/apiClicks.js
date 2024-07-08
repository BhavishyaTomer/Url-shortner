import supabase from "./supabase";


export async function getclicks(user_id) {
    const { data, error } = await supabase.from("clicks").select("*").eq("url_id", user_id);
  
    if (error){
        console.error("error ",error)
         throw new Error("Unable to load");
    }
  
    return data
  }
  
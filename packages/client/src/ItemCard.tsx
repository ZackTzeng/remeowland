import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NFT_STORAGE_SHOPITEMS } from "./constants";
import { useMUD } from "./MUDContext";

type Props = {
    id: number;
    itemId: string;
    showPrice?: boolean;
}

export function ItemCard({id, itemId, showPrice = true}: Props) {

  const [img = "/assets/default.svg", setImg] = useState("");
  const [name = "Item Name", setName] = useState("");
  const [description = "Item Description", setDescription] = useState("");
  const [price = 0, setPrice] = useState("");

  function placeToRoom() {

  }

  useEffect(() => {
    async function loadData() {
      try {
        const metadataUri = NFT_STORAGE_SHOPITEMS + id.toString();
        const response = await fetch(metadataUri);
        const json = await response.json();
        let img = json.image;
        img = img.replace(/ipfs/, "https") + ".ipfs.nftstorage.link";
        setImg(img);
        setName(json.name);
        setDescription(json.description);
        setPrice(json.attributes[0].value);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const {
    systemCalls: {
      acquireItem,
      addItemToRoom,
    }
  } = useMUD();

  const buyItem = async () => {
    try {
      await acquireItem(id.toString());
    } catch (e) {
      console.error(e);
    }
  };
  
  const placeItem = async () => {
    try {
      console.log(itemId, "adding");
      await addItemToRoom(itemId, 300, 300);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="shop item"
        height="140"
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
      </CardContent>
      <CardActions>

        <Button size="small" onClick={showPrice? buyItem : placeItem}>

          {showPrice?
            "Buy for " + price + " Meows!" :
            "Place in room!"
          }
        </Button>
      </CardActions>
    </Card>
  );
}